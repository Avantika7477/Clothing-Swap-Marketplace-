import MainLayout from "../../layouts/MainLayout";

import AddItemHeader from "./sections/AddItemHeader";
import UploadImages from "./sections/UploadImages";
import ItemDetailsForm from "./sections/ItemDetailsForm";
import ConditionSection from "./sections/ConditionSection";
import DescriptionSection from "./sections/DescriptionSection";
import ItemPreview from "./sections/ItemPreview";
import SubmitSection from "./sections/SubmitSection";

const AddItem = () => {
  return (
    <MainLayout>
      <section className="bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <AddItemHeader />

          <div className="space-y-8 mt-8">
            <UploadImages />

            <ItemDetailsForm />

            <ConditionSection />

            <DescriptionSection />

            <ItemPreview />

            <SubmitSection />
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default AddItem;
