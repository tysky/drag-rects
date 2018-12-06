# Drag colored rectangles

### [Live Application](http://drag-rectangles.surge.sh/)

The application allows to create rectangles, move them, create links between rectangles and delete created links.

### Setup

```sh
npm install
```
or
```sh
make install
```

### Run

```sh
npm run webpack-serve
```
or
```sh
make start
```
Then open http://localhost:8080/
### Build

```sh
make build
```
## How to Use
#### Create a Rectangle.
To create a rectangle, double-click on any area of the screen. Rectangles should not intersect. 
If there is not enough space between rectangles to create a new rectangle, the programm shows an error "Not enough space to create a rectangle! Try again."
#### Move Rectangles
To move a rectangle on the screen, left click on it, hold the left mouse button and move the object on the screen.
#### Create a Link between Rectangles
To link two rectangles, you need to select one of them by left click, it will be highlighted in yellow color. Then select the second rectangle. When the link is successfully created, a line appears between the rectangles. You can create an unlimited amount of links between rectangles. When you move the rectangles on the screen, the links between them are saved.
#### Remove Links
To remove the link, move the mouse cursor to the line between the rectangles, it will be highlighted in orange. Then left click on it.
#### Mode switching
To protect your work, you can temporarily disable the creation and deletion of links. To do this, uncheck "Draw link" or "Delete link".
#### Clear the Screen
To clear the screen of the created objects, click the Clear button.

## Инструкция
Программа позволяет создавать прямоугольники, перемещать их, создавать между ними связи и удалять созданные связи.

#### Создание прямоугольника.
Для того, чтобы создать прямоугольник, кликните два раза на любой области экрана. Прямоугольники не должны пересекаться. Если пространства между созданными прямоугольниками недостаточно для создания нового прямоугольника, программа выдаёт ошибку “Not enough space to create a rectangle! Try again.”

#### Перемещение прямоугольников
Для перемещения прямоугольника по экрану, кликните по нему левой клавишей мыши и, зажав ее, перемещайте объект по экрану.

#### Создание связи между прямоугольниками
Чтобы связать между собой два прямоугольника, необходимо выделить один из них одинарным щелчком мыши, он подсветится желтым цветом. Затем выделить второй прямоугольник. Когда связь успешно образована, между прямоугольниками появляется линия. Между прямоугольниками можно создать неограниченное число связей. При перемещении прямоугольников по полю, связи между ними сохраняются.

#### Удаление связей.
Для того чтобы удалить связь, подведите курсор мыши к линии между прямоугольниками, она подсветится оранжевым цветом. Затем, кликните по ней левой клавишей мыши.

#### Переключение режимов
Для того, чтобы защитить выполненную работу, можно временно заблокировать создание и удаление связей. Для этого, снимите галочки около «Draw link» или «Delete link”, соответственно.

#### Очистка экрана
Чтобы очистить экран от созданных объектов, нажмите кнопку Clear.

