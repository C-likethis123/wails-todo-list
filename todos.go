package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"path"

	"github.com/fsnotify/fsnotify"
	"github.com/wailsapp/wails"
)

type Todos struct {
	filename string
	runtime  *wails.Runtime
	logger   *wails.CustomLogger
}

// LoadList loads the list to mylist.json
func (t *Todos) LoadList() (string, error) {
	t.logger.Infof("Loading list from: %s", t.filename)
	bytes, err := ioutil.ReadFile(t.filename)
	if err != nil {
		err = fmt.Errorf("Unable to open list: %s", t.filename)
	}
	return string(bytes), err
}

// SaveList saves the list to mylist.json
func (t *Todos) SaveList(todos string) error {
	t.logger.Infof("Saving list: %s", todos)
	return ioutil.WriteFile(t.filename, []byte(todos), 0600)
}

// NewTodos attempts to create a new Todo list
func NewTodos() (*Todos, error) {
	// Create new Todos instance
	result := &Todos{}
	// Try and get the current working directory
	cwd, err := os.Getwd()
	if err != nil {
		return nil, err
	}
	// Join the cwd with our todos filename
	filename := path.Join(cwd, "mylist.json")
	// Set the filename member of our new Todo list
	result.filename = filename
	// Return it
	return result, nil
}

func (t *Todos) SaveAs(todos string) error {
	filename := t.runtime.Dialog.SelectSaveFile()
	t.logger.Info("Save As: " + filename)
	return nil
}

func (t *Todos) WailsInit(runtime *wails.Runtime) error {
	t.runtime = runtime
	t.logger = t.runtime.Log.New("Todos")
	t.logger.Info("I'm here")

	// Set the default filename to $HOMEDIR/mylist.json
	homedir, err := runtime.FileSystem.HomeDir()
	if err != nil {
		return err
	}
	t.filename = path.Join(homedir, "mylist.json")

	t.ensureFileExists()
	return t.startWatcher()
}

func (t *Todos) ensureFileExists() {
	// Check status of file
	_, err := os.Stat(t.filename)
	// If it doesn't exist
	if os.IsNotExist(err) {
		// Create it with a blank list
		ioutil.WriteFile(t.filename, []byte("[]"), 0600)
	}
}

func (t *Todos) startWatcher() error {
	t.logger.Info("Starting Watcher")
	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		return err
	}

	go func() {
		for {
			select {
			case event, ok := <-watcher.Events:
				if !ok {
					return
				}
				if event.Op&fsnotify.Write == fsnotify.Write {
					t.logger.Infof("modified file: %s", event.Name)
					t.runtime.Events.Emit("filemodified")
				}
			case err, ok := <-watcher.Errors:
				if !ok {
					return
				}
				t.logger.Error(err.Error())
			}
		}
	}()

	err = watcher.Add(t.filename)
	if err != nil {
		return err
	}
	return nil
}
