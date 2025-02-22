
import Link from 'next/link';
import Taskbar from '@/components/Taskbar';
import Image from 'next/image'; // Import the Image component
import FormComponent from "../FormComponent";

export default function FormPage() {
  return (
    <div>
      <Taskbar/>

      <section>
        <h1 className="text-2xl font-bold mb-6">Arrest Report Form</h1>
        <FormComponent />
        </section>
    </div>
  );
}