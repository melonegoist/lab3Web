package edu.beans;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Named;

import java.io.Serializable;
import java.sql.SQLException;
import java.util.ArrayList;

@Named("formBean")
@RequestScoped
public class FormBean implements Serializable {
    private final static long serialVersionUID = -1L;

    private float x;
    private float y;
    private int r = 1;
    private boolean[] rValues;
    private ArrayList<String[]> output;

    private float hiddenX;
    private float hiddenY;


    public FormBean() {
        x = 0f;
        y = 0f;
        rValues = new boolean[5];
    }


    // getters
    public float getX() { return x; }

    public float getY() {
        return y;
    }

    public boolean[] getrValues() {
        return rValues;
    }

    public float getHiddenX() { return hiddenX; }

    public float getHiddenY() { return hiddenY; }


    // setters
    public void setX(float x) {
        this.x = x;
    }

    public void setY(float y) {
        this.y = y;
    }

    public void setrValues(boolean[] rValues) {
        this.rValues = rValues;
    }

    public void setHiddenX(float x) { this.hiddenX = x; }

    public void setHiddenY(float y) { this.hiddenY = y; }


    // methods
    public void submit() throws SQLException {
        int counter = 1;

        for (boolean rValue: rValues) {
            if (rValue) {r = counter; break;}
            counter++;
        }

        System.out.print("Result of session: ");
        System.out.println(inArea(x, y, r));

        System.out.println("hidden values: " + hiddenX + " " + hiddenY);

        if ((hiddenX != 0) && (hiddenY != 0)) {
            x = hiddenX;
            y = hiddenY;

            setHiddenX(0);
            setHiddenY(0);
        }

        ResultBean resultBean = new ResultBean(x, y, r, inArea(x, y, r));
        resultBean.saveResults();
        output = resultBean.getResults();
    }

    private boolean inArea(float x, float y, int r) {
        boolean isRectChecked = ((x <= 0) && (x >= -r) && (y <= 0) && (y >= -r/2f));
        boolean isTriangleChecked = ((x >= 0) && (x <= r) && (y <= 0) && (y >= -r/2f) && (y >= (1/2f*x - r/2f)));
        boolean isSectorChecked = ((x <= 0) && (x >= -r) && (y >= 0) && (y <= r) && ((x*x + y*y) <= r*r));

        return (isRectChecked||isTriangleChecked||isSectorChecked);
    }

    public void setOutput(ArrayList<String[]> output) {
        this.output = output;
    }

    public ArrayList<String[]> getOutput() {
        return output;
    }
}
