package ship.ship_game;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.GridPane;
import javafx.stage.Stage;
import model.*;

public class App extends Application {

    private Label statusLabel = new Label("Willkommen bei Schiffe Versenken!");
    private Playground playground;
    private GameController gameController;
    private Button[][] gridButtons;

    @SuppressWarnings("deprecation")
	@Override
    public void start(Stage primaryStage) {
        playground = new Playground(10); // Spielfeld initialisieren
        gameController = new GameController(playground, this); // Controller instanziieren
        playground.addObserver(gameController); // Observer registrieren
        
        BorderPane root = new BorderPane();
        GridPane gridPane = new GridPane();
        gridButtons = new Button[10][10];

        for (int row = 0; row < 10; row++) {
            for (int col = 0; col < 10; col++) {
                Button button = new Button("_"); // Unbekanntes Feld
                button.setPrefSize(40, 40);
                int finalRow = row;
                int finalCol = col;
                button.setOnAction(e -> gameController.shoot(finalRow, finalCol));
                gridButtons[row][col] = button;
                gridPane.add(button, col, row);
            }
        }

        root.setCenter(gridPane);
        root.setBottom(statusLabel);

        Scene scene = new Scene(root, 500, 550);
        primaryStage.setTitle("Schiffe Versenken");
        primaryStage.setScene(scene);
        primaryStage.show();

        initShips();
    }

    public void updateBoard(int row, int col, char result) {
        Button button = gridButtons[row][col];
        button.setText(String.valueOf(result));
        button.setDisable(true);
    }

    public void updateStatus(String message) {
        statusLabel.setText(message);
    }

    private void initShips() {
        ShipFactory.placeShipsRandomly(playground);
    }
    
    public void disableAllButtons() {
        for (int row = 0; row < 10; row++) {
            for (int col = 0; col < 10; col++) {
                gridButtons[row][col].setDisable(true);
            }
        }
    }

    public static void main(String[] args) {
        launch();
    }
}
