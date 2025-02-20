

import Box from "@/components/box";
import { CustomBreadCrumb } from "@/components/custom-bread-crumb";
import { auth, currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { NameForm } from "@/app/(dashboard)/(routes)/user/_components/name-form";
import { UserProfile } from "@prisma/client";
import { db } from "@/lib/db";
import { EmailForm } from "@/app/(dashboard)/(routes)/user/_components/email-form";
import { ContactForm } from "./_components/contact-form";


const ProfilePage = async () => {
    const { userId } = await auth();
    const user = await currentUser();
  
    if (!userId) {
      redirect("/sign-in");
    }
  

    const profile = await db.userProfile.findUnique({
      where: {
        userId,
      },
      include: {
        resumes: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });


  return (
    <div className="flex-col p-4 md:p-8 items-center justify-center flex">
      <div className="flex-col p-4 md:p-8 items-center justify-center flex mr-[1800px]">
        <Box className="">
          <CustomBreadCrumb breadCrumbPage="My Profile" breadCrumbItem={[]} />
        </Box>
      </div>

      <Box className="flex-col p-4 rounded-md border-2 mt-8 w-full space-y-6">
        {user && user.hasImage && (
          <div className="aspect-square w-24 h-24 rounded-full shadow-md relative">
            <Image
              fill
              className="w-full h-full object-cover"
              alt="User Profile Pic"
              src={user.imageUrl}
            />
          </div>
        )}
      </Box>

      <NameForm initialData={profile} userId={userId} />
      <EmailForm initialData={profile} userId={userId} />
      <ContactForm initialData={profile} userId={userId}/>
    </div>
  );
};

export default ProfilePage;
