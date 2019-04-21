/*
 * curl -X "GET" "https://api.spotify.com/v1/playlists/3oHKokI6S1vVN7x8ZvttRH" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQBmUnUFPifydOaSLUu8qkRevdGX9gq1j3Dz7RZ_fwbS4JcJT6PZVm5LlT3qViIl9ynbj5O1n2MMeDT-mpV_RkZ-9gelTAPjpp8EH4eDa9cVolvg3-VmL81l_QDHme78MrErVTDEuupTJw"
 */
module.exports = () => {
	const data = { users: [] };
	// Create 1000 users
	for (let i = 0; i < 1000; i++) {
		data.users.push({ id: i, name: `user${i}` });
	}
	return data;
};
