class Game {
    constructor(size) {
        this.playerOne = null;
        this.playerTwo = null;
        this.playerOneScore = 0;
        this.playerTwoScore = 0;
        this.playerOnePos = {r: 0, c: 0};
        this.playerTwoPos = {r: size - 1, c: size - 1};
        this.data = this.buildGameData(size);
        this.isInProgress = false;
    }

    buildGameData(size) {
        let data = [];
        for (let i=0; i < size; i++) {
            let rowData = [];
            for (let j=0; j < size; j++) {
                rowData.push(null);
            }
            data.push(rowData);
        }
        return data;
    }
}
export default Game;