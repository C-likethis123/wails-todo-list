package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"path"

	"github.com/wailsapp/wails"
	"gopkg.in/fsnotify.v1"
)

type Todos struct {
	filename string
	runtime  *wails.Runtime
	logger   *wails.CustomLogger
}

// NewTodos attempts to create a new Todo list
func NewTodos() (*Todos, error) {
	// Create new Todos instance
	result := &Todos{}
	// Try and get current working directory
	cwd, err := os.Getwd()
	if err != nil {
		return nil, err
	}
	// Join the cwd with our todos filename
	filename := path.Join(cwd, "mylist.json")
	result.filename = filename
	return result, nil
}

func (t *Todos) LoadList() (string, error) {
	t.logger.Infof("Loading list from: %s", t.filename)
	bytes, err := ioutil.ReadFile(t.filename)
	if err != nil {
		err = fmt.Errorf("Unable to open list: %s", t.filename)
	}
	return string(bytes), err
}

func (t *Todos) SaveList(todos string) error {
	t.logger.Infof("Saving list: %s", todos)
	return ioutil.WriteFile(t.filename, []byte(todos), 0600)
}

func (t *Todos) WailsInit(runtime *wails.Runtime) error {
	t.runtime = runtime
	t.logger = t.runtime.Log.New("Todos")
	t.logger.Info("I'm here")
	return t.startWatcher()
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
