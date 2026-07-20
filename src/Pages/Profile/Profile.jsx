import MainLayout from "../../layouts/MainLayout";

import ProfileHeader from "./sections/ProfileHeader";
import ProfileInfo from "./sections/ProfileInfo";
import EditProfileForm from "./sections/EditProfileForm";
import ProfilePictureUpload from "./sections/ProfilePictureUpload";
import ChangePasswordCard from "./sections/ChangePasswordCard";

const Profile = () => {
  return (
    <MainLayout>
      <section className="bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <ProfileHeader />

          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            <div>
              <ProfilePictureUpload />

              <ProfileInfo />
            </div>
            <div className="lg:col-span-2">
              <EditProfileForm />
              <ChangePasswordCard />
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Profile;
