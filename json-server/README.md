# Updating Tracks db
- Based ond Spotify playlist - [Finnish Rock&Metal](https://open.spotify.com/user/stratcast/playlist/3TO9ZskHr3Bh6AyjUYReu2?si=AvAkPKkeTmOWvrNl2VU1wQ)

[Token](https://developer.spotify.com/console/get-playlist/?playlist_id=59ZbFPES4DQwEjBpWHzrtC&market=&fields=)

```sh
curl -X "GET" "https://api.spotify.com/v1/playlists/3TO9ZskHr3Bh6AyjUYReu2" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQBmUnUFPifydOaSLUu8qkRevdGX9gq1j3Dz7RZ_fwbS4JcJT6PZVm5LlT3qViIl9ynbj5O1n2MMeDT-mpV_RkZ-9gelTAPjpp8EH4eDa9cVolvg3-VmL81l_QDHme78MrErVTDEuupTJw" > db.json
```

```sh
curl -X "GET" "https://api.spotify.com/v1/playlists/3TO9ZskHr3Bh6AyjUYReu2" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQDDKOTn5i4QXrR-wo0HGZx6CWLDmJNCnpmvZxvXoxZmTx2ycyUtU0iTkrQXuEU1ZWxHufVXYNxgD6PvGNRjinPxSVPX4XkPRV5X3X_2bTXyf3tZbw2tDjQVwbwwIuOEcn3u5GawKaj05w" > db.json
```
