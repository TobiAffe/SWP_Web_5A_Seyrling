package model;

import java.util.List;

public class Ship {
    private List<ShipPart> parts;
    private int hits;

    public Ship(List<ShipPart> parts) {
        this.parts = parts;
        this.hits = 0;
    }

    public void hitPart() { hits++; }
    public boolean isSunk() { return hits == parts.size(); }
}
