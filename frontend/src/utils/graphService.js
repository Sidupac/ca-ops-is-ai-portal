
const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
  graphGroupsEndpoint: "https://graph.microsoft.com/v1.0/me/memberOf",
};

export async function getUserDetails(instance) {
  try {
    const accounts = instance.getAllAccounts();
    if (accounts.length === 0) return null;
    const response = await instance.acquireTokenSilent({ scopes: ["User.Read"], account: accounts[0] });
    return await fetch(graphConfig.graphMeEndpoint, { headers: { Authorization: `Bearer ${response.accessToken}` } }).then(res => res.json());
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
}

// Restored getUserGroups function to fetch user groups for access control
export async function getUserGroups(instance) {
  try {
    const accounts = instance.getAllAccounts();
    if (accounts.length === 0) return null;
    const response = await instance.acquireTokenSilent({ scopes: ["Group.Read.All"], account: accounts[0] });
    const groupResponse = await fetch(graphConfig.graphGroupsEndpoint, {
      headers: { Authorization: `Bearer ${response.accessToken}` }
    });
    const groupData = await groupResponse.json();
    return groupData.value.map(group => group.displayName);
  } catch (error) {
    console.error("Error fetching user groups:", error);
    return [];
  }
}
