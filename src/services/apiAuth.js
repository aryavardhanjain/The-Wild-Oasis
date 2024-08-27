import supabase, { supabaseUrl } from "./supabase";

export async function signup({ full_name, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function updateCurrentUser({ password, full_name, avatar }) {
  // * 1. Update password OR full_name
  let updateData = {};
  if (password) updateData.password = password;
  if (full_name) updateData.data = { full_name };

  // Attempt to update the user
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  // If no avatar is being updated, return the data as is
  if (!avatar) return data;

  // Handle case where data or data.user might be undefined
  if (!data || !data.user) {
    throw new Error("User data is not available after update.");
  }

  // * 2. Upload avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // * 3. Update avatar URL in user profile
  const avatarUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: avatarUrl,
    },
  });

  if (error2) throw new Error(error2.message);

  return updatedUser;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
