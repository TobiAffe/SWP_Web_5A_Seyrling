package model;

public class Field {
    private int row, col;
    private boolean isHit;

    public Field(int row, int col) {
        this.row = row;
        this.col = col;
        this.isHit = false;
    }

    public boolean isHit() { return isHit; }
    public void setHit(boolean hit) { isHit = hit; }
    public int getRow() { return row; }
    public int getCol() { return col; }
}
