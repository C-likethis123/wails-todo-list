package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"path"

	"github.com/leaanthony/mewn"
	"github.com/wailsapp/wails"
)

func saveList(todos string) error {
	cwd, err := os.Getwd()
	if err != nil {
		return err
	}
	filename := path.Join(cwd, "mylist.json")
	return ioutil.WriteFile(filename, []byte(todos), 0600)
}

func loadList() (string, error) {
	cwd, err := os.Getwd()
	if err != nil {
		return "", err
	}
	filename := path.Join(cwd, "mylist.json")
	bytes, err := ioutil.ReadFile(filename)
	if err != nil {
		err = fmt.Errorf("Unable to open list: %s", filename)
	}
	var result = string(bytes)
	return result, err
}

func errorOrSuccess(success bool) (string, error) {
	if success {
		return "I was successful", nil
	}
	return "", fmt.Errorf("i am an error")
}

func main() {

	js := mewn.String("./frontend/build/static/js/main.js")
	css := mewn.String("./frontend/build/static/css/main.css")

	app := wails.CreateApp(&wails.AppConfig{
		Width:  1024,
		Height: 768,
		Title:  "todos",
		JS:     js,
		CSS:    css,
		Colour: "#131313",
	})
	
	app.Bind(saveList)
	app.Bind(loadList)
	app.Bind(errorOrSuccess)
	app.Run()
}
