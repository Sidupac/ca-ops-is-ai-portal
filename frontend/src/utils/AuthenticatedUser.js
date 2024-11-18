
'use client';

import React, { useEffect, useState } from "react";
import { useMsal, useAccount, useIsAuthenticated } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { getUserDetails, getUserGroups } from "./graphService";
import AppLayout from "../layout";
import { BYPASS_AUTHENTICATION } from "../config";

const AuthenticatedUser = () => {
  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});
  const isAuthenticated = useIsAuthenticated();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("Authentication status:", isAuthenticated);
  console.log("Account:", account);
  console.log("MSAL InProgress:", inProgress);

  // Bypass authentication if the flag is set to true
  if (BYPASS_AUTHENTICATION) {
    console.log("Bypassing authentication due to config flag");
    return <AppLayout user={{ name: "Bypassed User", groups: [] }} />;
  }

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated && account && inProgress === InteractionStatus.None) {
        try {
          console.log("Attempting to fetch user details...");
          const userDetails = await getUserDetails(instance);
          console.log("User details fetched:", userDetails);
          const userGroups = await getUserGroups(instance);
          console.log("User groups fetched:", userGroups);
          setUser({ ...userDetails, groups: userGroups });
        } catch (error) {
          console.error("Error fetching user details or groups:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated, account, inProgress, instance]);

  if (loading) {
    return <div>Authenticating...</div>;
  }

  return user ? <AppLayout user={user} /> : <div>Please sign in</div>;
};

export default AuthenticatedUser;
