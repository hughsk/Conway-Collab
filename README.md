# Conway's Collaborative Game of Life
Conway's Game of Life is the textbook example of Cellular Automata. Each cell follows a simple set of rules that decides if it will survive in the next generation, based on the amount of neighbouring cells, in this case:

* Less than 2 - the cells dies, as if by underpopulation.
* 2 or 3 - the cell survies to the next generation.
* More than 3 - the cells dies, as if by overpopulation.
* Exactly 3 - a new cell is born, as if by reproduction.

In this version of the game, everybody plays with the same grid at the same time. It's your collective goal to keep the cell population above 5% for as long as possible, or the game will reset. The cells can survive on their own for a limited amount of time, but to keep them alive for as many generations as possible you'll have to intervene by creating and killing cells at will! This is easy on your own at first but as time goes on generations will advance at accelerating speeds.
Designed and developed during spare time over the course of a week by [Hugh Kennedy](http://hughskennedy.com "Hugh Kennedy") using *Node.JS* to run the server and *NowJS* to handle any otherwise nasty real-time stuff.

## License 

(The MIT License)

Copyright (c) 2011 Hugh Kennedy &lt;hughskennedy@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
