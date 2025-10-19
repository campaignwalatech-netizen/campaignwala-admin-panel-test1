// src/components/Dashboard.js
import React from "react";

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to Your Dashboard 🎯</h1>
      <p>Here you can manage your campaigns and view insights.</p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
    fontFamily: "Poppins, sans-serif",
  },
};

export default Dashboard;