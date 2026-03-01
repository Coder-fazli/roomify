"use client";

import { Box } from "lucide-react";
import { Button } from "./ui/Button";
import { useUser, useClerk } from "@clerk/nextjs";

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const { signOut, openSignIn } = useClerk();

  const handleAuthClick = async () => {
    if (isSignedIn) {
      try {
        await signOut();
      } catch (e) {
        console.error(`Sign out failed: ${e}`);
      }
    } else {
      try {
        openSignIn();
      } catch (e) {
        console.error(`Sign in failed: ${e}`);
      }
    }
  };

  return (
    <header className="navbar">
      <nav className="inner">
        <div className="left">
          <div className="brand">
            <Box className="logo" />
            <span className="name">Floo3D</span>
          </div>
          <ul className="links">
            <li><a href="">Product</a></li>
            <li><a href="">Pricing</a></li>
            <li><a href="">Community</a></li>
            <li><a href="">Enterprise</a></li>
          </ul>
        </div>

        <div className="actions">
          {isSignedIn ? (
            <>
              <span className="greeting">
                {user?.firstName ? `Hi, ${user.firstName}` : "Signed in"}
              </span>
              <Button size="sm" onClick={handleAuthClick} className="btn">
                Log Out
              </Button>
            </>
          ) : (
            <Button size="sm" variant="ghost" onClick={handleAuthClick} className="login">
              Log In
            </Button>
          )}

          <a href="#upload" className="cta">
            Get started
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
