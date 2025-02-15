package edu.classes;

import java.sql.*;
import java.util.ArrayList;

public class DbHandler {
    public static Connection connection;
    private static final String insertQuery = "INSERT INTO lab_results(x, y, r, inArea) VALUES (?, ?, ?, ?);";
    private static final String createTableQuery = "CREATE TABLE IF NOT EXISTS lab_results(id SERIAL PRIMARY KEY, x REAL NOT NULL, y REAL NOT NULL, r INTEGER NOT NULL, inArea BOOLEAN NOT NULL);";
    private static final String getCoordsQuery = "SELECT x, y, r, inArea FROM lab_results;";

    public static void init(String url, String login, String password) throws SQLException {
        connection = DriverManager.getConnection(url, login, password);
        System.out.println("Connection success");

        Statement creatingStatement = connection.createStatement();
        int set = creatingStatement.executeUpdate(createTableQuery);
        creatingStatement.close();
    }

    public static void insertInDb(Object[] data) throws SQLException {
        PreparedStatement statement = connection.prepareStatement(insertQuery);

        int len = data.length;

        for (int i = 1; i <= len; i++) {
            statement.setObject(i, data[i-1]);
        }

        int result = statement.executeUpdate();
        System.out.println(result);
    }

    public static ArrayList<String[]> getFromDb() throws SQLException {
        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery(getCoordsQuery);

        ArrayList<String[]> output = new ArrayList<>();

        while (resultSet.next()) {
            String[] currLine = new String[4];

            currLine[0] = resultSet.getString("x");
            currLine[1] = resultSet.getString("y");
            currLine[2] = resultSet.getString("r");
            currLine[3] = resultSet.getString("inArea");

            output.add(currLine);
        }

        return output;
    }
}
