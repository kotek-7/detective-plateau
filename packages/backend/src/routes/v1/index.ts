import express from "express";
import { searchLocal, SearchResult } from "../../services/yahooSearchService.js";

const router = express.Router();

// --- In-Memory State ---
// This variable will hold the generated event list for the current game session.
// Note: This simple approach is not suitable for multiple concurrent games.
let gameEvents: any[] = [];

/**
 * Endpoint to generate the game route. Triggered by Unity.
 * Takes a search query, gets locations from Yahoo, populates a template,
 * and stores the result in the in-memory 'gameEvents' variable.
 */
router.get('/search', async (req, res) => {
  let searchQuery = req.query.query as string;
  if (!searchQuery) {
    searchQuery = "文化"; // Default query
  }

  try {
    // 1. Get dynamic locations from Yahoo
    const searchResults = await searchLocal(searchQuery);

    // --- DEBUGGING LOGS ---
    console.log('--- Yahoo API Debug ---');
    console.log(`Query: "${searchQuery}"`);
    console.log(`Number of results received: ${searchResults.length}`);
    console.log('Results:', JSON.stringify(searchResults, null, 2));
    console.log('-----------------------');

    // 2. Define the template with placeholders
    const eventTemplate = [
      // { type: "footprints", latitude: 35.0150, longitude: 135.7720, message: "古い足跡" },
      { type: "hint", latitude: "代入", longitude: "代入", message: "ヒント1" },
      { type: "hint", latitude: "代入", longitude: "代入", message: "ヒント2" },
      { type: "hint", latitude: "代入", longitude: "代入", message: "ヒント3" },
      { type: "hint", latitude: "代入", longitude: "代入", message: "ヒント4" },
      { type: "human", latitude: "代入", longitude: "代入", message: "犯人はこっち" },
      { type: "human", latitude: "代入", longitude: "代入", message: "犯人はこっちに来ていない" },
      { type: "goal", latitude: "代入", longitude: "代入", message: "ゴール" },
    ];

    // 3. Fill the placeholders with search results
    let searchResultIndex = 0;
    const populatedEvents = eventTemplate.map(event => {
      if (event.latitude === "代入" && searchResults[searchResultIndex]) {
        const { latitude, longitude, message } = searchResults[searchResultIndex];
        searchResultIndex++;
        // Use the message from Yahoo results for hints, otherwise keep template message
        const finalMessage = event.type === 'hint' ? message : event.message;
        return { ...event, latitude, longitude, message: finalMessage };
      }
      return event;
    });

    // 4. Store the result in our in-memory state
    gameEvents = populatedEvents;

    console.log('Successfully generated and stored new game events.');
    res.json({ status: 'ok', message: 'Game events generated successfully.' });

  } catch (error) {
    console.error('Error during /search processing:', error);
    res.status(500).json({ error: 'Failed to generate game events.' });
  }
});

/**
 * Endpoint to provide the generated game events to the web client.
 */
router.get('/events', (req, res) => {
  if (gameEvents.length === 0) {
    return res.status(404).json({ error: 'No game has been started yet. Call /search first.' });
  }
  res.json(gameEvents);
});

export default router;

