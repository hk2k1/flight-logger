import { auth, signOut } from "@/auth";

const SettingsPage = async () => {
  const session = await auth();
  return (
    <div>
      <h1>Settings</h1>
      <p>Welcome, {JSON.stringify(session)}</p>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button>Sign Out</button>
      </form>
    </div>
  );
};

export default SettingsPage;
