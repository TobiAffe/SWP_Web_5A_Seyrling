package model;

public class ShipPart extends Field {
    private Ship ship;

    public ShipPart(int row, int col, Ship ship) {
        super(row, col);
        this.ship = ship;
    }

    public Ship getShip() { return ship; }
}
