package ship.ship_game;

import java.util.ArrayList;
import java.util.List;
import java.util.Observable;
import model.Field;
import model.Ship;
import model.ShipPart;

public class Playground extends Observable {
    private int size;
    private Field[][] fields;
    private List<Ship> ships; 

    public Playground(int size) {
        this.size = size;
        this.fields = new Field[size][size];
        this.ships = new ArrayList<>(); // Initialisiere die Liste
        initializeFields();
    }

    private void initializeFields() {
        for (int row = 0; row < size; row++) {
            for (int col = 0; col < size; col++) {
                fields[row][col] = new Field(row, col);
            }
        }
    }

    public int getSize() {
        return size;
    }

    public Field getField(int row, int col) {
        if (isValidPosition(row, col)) {
            return fields[row][col];
        }
        return null;
    }

    public void setField(int row, int col, Field field) {
        if (isValidPosition(row, col)) {
            fields[row][col] = field;
        }
    }

    public boolean isValidPosition(int row, int col) {
        return row >= 0 && row < size && col >= 0 && col < size;
    }

    public void shootAt(int row, int col) {
        Field field = getField(row, col);
        if (field == null || field.isHit()) {
            return; // Bereits beschossen oder ungültig
        }

        field.setHit(true);
        char result = 'W';

        if (field instanceof ShipPart) {
            ShipPart shipPart = (ShipPart) field;
            shipPart.getShip().hitPart();
            result = 'X'; // Treffer

            if (shipPart.getShip().isSunk()) {
                setChanged();
                notifyObservers("Schiff versenkt!");
            }
        }

        setChanged();
        notifyObservers(field);
    }

    public boolean allShipsSunk() {
        if (ships == null || ships.isEmpty()) {
            return false; 
        }

        for (Ship ship : ships) {
            if (!ship.isSunk()) {
                return false;
            }
        }
        return true;
    }

    public void placeShips() {
        ships = ShipFactory.placeShipsRandomly(this);
    }
}
