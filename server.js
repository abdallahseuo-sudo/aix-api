const express = require("express");
const app = express();

const API_KEY = "BJiR9LjGTteaPt4jqh2c69DY";

app.get("/apis/instgarm.php", async (req, res) => {
  const username = (req.query.username || "").trim();

  if (!username) {
    return res.json({ error: "username required" });
  }

  try {
    const url =
      "https://www.searchapi.io/api/v1/search?" +
      new URLSearchParams({
        engine: "instagram_profile",
        username: username,
        api_key: API_KEY
      });

    const response = await fetch(url);
    const data = await response.json();

    const profile = data.profile;

    if (!profile) {
      return res.json({
        full_name: "Not Found",
        username: username,
        posts: "0",
        followers: "0",
        following: "0",
        profile_picture: "https://i.imgur.com/6VBx3io.png"
      });
    }

    res.json({
      full_name: String(profile.name || ""),
      username: String(profile.username || username),
      posts: String(profile.posts || "0"),
      followers: String(profile.followers || "0"),
      following: String(profile.following || "0"),
      profile_picture: String(profile.avatar || "https://i.imgur.com/6VBx3io.png")
    });
  } catch (e) {
    res.json({
      full_name: "Not Found",
      username: username,
      posts: "0",
      followers: "0",
      following: "0",
      profile_picture: "https://i.imgur.com/6VBx3io.png"
    });
  }
});

app.get("/", (req, res) => {
  res.send("Aix API is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));