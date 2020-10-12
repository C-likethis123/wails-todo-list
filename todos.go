package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"path"
)

type Todos struct {
	filename string
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

func (t *Todos) loadList() (string, error) {
	bytes, err := ioutil.ReadFile(t.filename)
	if err != nil {
		err = fmt.Errorf("Unable to open list: %s", t.filename)
	}
	return string(bytes), err
}

func (t *Todos) saveList(todos string) error {
	return ioutil.WriteFile(t.filename, []byte(todos), 0600)
}
