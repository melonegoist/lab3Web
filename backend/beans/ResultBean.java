package edu.beans;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import edu.classes.DbHandler;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Named;

import java.io.FileReader;
import java.io.IOException;
import java.io.Serializable;
import java.lang.reflect.Type;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Map;

@Named("resultBean")
@ApplicationScoped
public class ResultBean implements Serializable {
    private final static long serialVersionUID = -2L;
    private float x;
    private float y;
    private int r;
    private boolean result;
    private ArrayList<String[]> output;

    public ResultBean(float x, float y, int r, boolean result) throws SQLException {
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = result;

        dbConnect();
    }

    public void saveResults() throws SQLException {
        DbHandler.insertInDb(new Object[]{x, y, r, result});
        output = getResults();
    }

    public ArrayList<String[]> getResults() throws SQLException {
        System.out.println("done");
        return DbHandler.getFromDb();
    }

    private void dbConnect() throws SQLException {
        Gson gson = new Gson();
        Map<String, Object> jsonMap;

        try (FileReader reader = new FileReader("~/../../var/www/main/config.json")) {
            Type type = new TypeToken<Map<String, Object>>() {}.getType();
            jsonMap = gson.fromJson(reader, type);

            for (String key: jsonMap.keySet()) System.out.println(key);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        DbHandler.init(String.valueOf(jsonMap.get("url")), String.valueOf(jsonMap.get("login")), String.valueOf(jsonMap.get("password")));
    }

    public ArrayList<String[]> getOutput() {
        return output;
    }

    public void setOutput(ArrayList<String[]> output) {
        this.output = output;
    }
}
