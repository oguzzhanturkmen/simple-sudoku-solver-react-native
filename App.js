
import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, SafeAreaView, Text, Dimensions } from 'react-native';
import SudokuSolver from './SudokuSolver'; 
import { Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';


const numColumns = 9;
const tileSize = Dimensions.get('window').width / numColumns;

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: Array(9).fill(0).map(() => Array(9).fill(0)),
            initialBoard: Array(9).fill(0).map(() => Array(9).fill(0))
        };
    }

    handleInputChange = (text, row, col) => {
        let newBoard = this.state.board.map((r, i) => r.map((c, j) => (i === row && j === col ? parseInt(text) || 0 : c)));
        this.setState({ board: newBoard });
    };

    solvePuzzle = () => {
        let solver = new SudokuSolver(this.state.board);
        let solvedBoard = solver.solve();
        if (solvedBoard) {
          
            this.setState({ board: solvedBoard });
        } else {
            Alert.alert("No solution found", "The current puzzle cannot be solved.");
        }
    };

    resetPuzzle = () => {
        this.setState({ board: this.state.initialBoard.map(row => row.slice()) });
    };

    renderTile(row, col) {
        const borderStyle = {};
        if (row % 3 === 0 && row !== 0) {
            borderStyle.borderTopWidth = 3;
        }
        if (col % 3 === 0 && col !== 0) {
            borderStyle.borderLeftWidth = 3;
        }

        return (
            <View style={[styles.tile, borderStyle]} key={col}>
                <TextInput
                    style={styles.tileText}
                    keyboardType='numeric'
                    maxLength={1}
                    value={this.state.board[row][col].toString() === "0" ? "" : this.state.board[row][col].toString()}
                    onChangeText={(text) => this.handleInputChange(text, row, col)}
                />
            </View>
        );
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
              <StatusBar style="light" />
                <Text style={styles.header}>Simple Sudoku Solver</Text>
                <View style={styles.grid}>
                    {this.state.board.map((row, rowIndex) => row.map((col, colIndex) => this.renderTile(rowIndex, colIndex)))}
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Solve" onPress={this.solvePuzzle} color="#ffff" />
                    <Button title="Reset" onPress={this.resetPuzzle} color="#ffff" />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111111',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 20,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxWidth: Dimensions.get('window').width,
        
        backgroundColor: '#ffffff',
        
    },
    tile: {
        width: tileSize,
        height: tileSize,
        borderWidth: 1,
        borderColor: '#555555',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tileText: {
        fontSize: 20,
        color: '#111111',
        textAlign: 'center',
        padding: 10,
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
});
