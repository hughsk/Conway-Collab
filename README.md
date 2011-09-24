# Conway's Collaborative Game of Life
Conway's Game of Life is the textbook example of Cellular Automata. Each cell follows a simple set of rules that decides if it will survive in the next generation, based on the amount of neighbouring cells, in this case:
* Less than 2 - the cells dies, as if by underpopulation.
* 2 or 3 - the cell survies to the next generation.
* More than 3 - the cells dies, as if by overpopulation.
* Exactly 3 - a new cell is born, as if by reproduction.
In this version of the game, everybody plays with the same grid at the same time. It's your collective goal to keep the cell population above 5% for as long as possible, or the game will reset. The cells can survive on their own for a limited amount of time, but to keep them alive for as many generations as possible you'll have to intervene by creating and killing cells at will! This is easy on your own at first but as time goes on generations will advance at accelerating speeds.
Designed and developed during spare time over the course of a week by *Hugh Kennedy* using *Node.JS* to run the server and *NowJS* to handle any otherwise nasty real-time stuff.
