package ship.ship_game;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import model.Ship;
import model.ShipPart;

public class ShipFactory {
    private static Random rand = new Random();

    public static List<Ship> placeShipsRandomly(Playground playground) {
        List<Ship> ships = new ArrayList<>();
        int[] shipSizes = {5, 4, 4, 3, 3, 3, 2, 2, 2, 2}; // Flotte

        for (int size : shipSizes) {
            boolean placed = false;
            while (!placed) {
                int row = rand.nextInt(playground.getSize());
                int col = rand.nextInt(playground.getSize());
                boolean horizontal = rand.nextBoolean();

                if (schiffMöglich(row, col, size, horizontal, playground)) {
                    List<ShipPart> parts = new ArrayList<>();
                    Ship ship = new Ship(parts); // Neues Schiff erstellen

                    for (int i = 0; i < size; i++) {
                        int r = row + (horizontal ? 0 : i);
                        int c = col + (horizontal ? i : 0);
                        ShipPart part = new ShipPart(r, c, ship); // Ship setzen
                        parts.add(part);
                        playground.setField(r, c, part);
                    }

                    ships.add(ship);
                    placed = true;
                }
            }
        }
        return ships;
    }

    private static boolean schiffMöglich(int row, int col, int size, boolean horizontal, Playground playground) {
        for (int i = 0; i < size; i++) {
            int r = row + (horizontal ? 0 : i);
            int c = col + (horizontal ? i : 0);
            if (!playground.isValidPosition(r, c) || playground.getField(r, c) instanceof ShipPart) {
                return false;
            }
        }
        return true;
    }
}
