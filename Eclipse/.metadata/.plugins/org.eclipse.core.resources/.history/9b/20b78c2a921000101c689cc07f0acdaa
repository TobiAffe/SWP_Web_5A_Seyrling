package ship.ship_game;

import java.util.Observable;
import java.util.Observer;

import model.Field;
import model.ShipPart;

@SuppressWarnings("deprecation")
public class GameController implements Observer {

    private Playground playground;
    private App app;

    public GameController(Playground playground, App app) {
        this.playground = playground;
        this.app = app;
    }

    public void shoot(int row, int col) {
        Field field = playground.getField(row, col);

        if (field.isHit()) {
            app.updateStatus("Dieses Feld wurde bereits beschossen.");
            return;
        }

        field.setHit(true);

        if (field instanceof ShipPart) {
            ShipPart shipPart = (ShipPart) field;
            shipPart.getShip().hitPart();

            if (shipPart.getShip().isSunk()) {
                app.updateStatus("Schiff versenkt!");
            } else {
                app.updateStatus("Treffer!");
            }

            app.updateBoard(row, col, 'X'); // Treffer anzeigen
        } else {
            app.updateStatus("Wasser!");
            app.updateBoard(row, col, 'W'); // Wasser anzeigen
        }

        if (playground.allShipsSunk()) {
            app.updateStatus("Alle Schiffe wurden versenkt!");
            app.disableAllButtons(); 
        }
    }


	@Override
    public void update(Observable o, Object arg) {
        if (arg instanceof Field) {
            Field field = (Field) arg;
            int row = field.getRow();
            int col = field.getCol();
            char result = field instanceof ShipPart ? 'X' : 'W';

            app.updateBoard(row, col, result);
        }
    }
}
