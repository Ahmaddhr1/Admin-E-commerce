import { createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

// Fake auth function
const auth = async (req) => ({ id: "fakeId" });

const f = createUploadthing();

// Create different file routes based on your conditions
const categoriesCreateUploader = f({ 
  image: { maxFileSize: "2MB" } 
})
.middleware(async ({ req }) => {
  const user = await auth(req);
  if (!user) throw new UploadThingError("Unauthorized");
  return { userId: user.id };
})
.onUploadComplete(async ({ metadata, file }) => {
  console.log("Upload complete for userId:", metadata.userId);
  console.log("file url", file.url);
  return { uploadedBy: metadata.userId };
});

const defaultUploader = f({ 
  image: { maxFileSize: "2MB", maxFileCount: 5 } 
})
.middleware(async ({ req }) => {
  const user = await auth(req);
  if (!user) throw new UploadThingError("Unauthorized");
  return { userId: user.id };
})
.onUploadComplete(async ({ metadata, file }) => {
  console.log("Upload complete for userId:", metadata.userId);
  console.log("file url", file.url);
  return { uploadedBy: metadata.userId };
});

// Export the file router with both routes
export const ourFileRouter = {
  categoriesCreateUploader,
  defaultUploader,
};
