package main

import (
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
	result, err := ioutil.ReadFile(filename)
	return string(result), err
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
	app.Run()
}
