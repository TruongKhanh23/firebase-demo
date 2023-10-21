<template>
  <div
    class="flex justify-center items-start h-screen w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
  >
    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      @click="createUser"
    >
      Create User
    </button>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { db } from "../main";
import { collection, addDoc } from "firebase/firestore";

const createUser = async () => {
  const collRef = collection(db, "users");
  const dataObject = {
    firstName: "Ha",
    lastName: "Nhi",
    dob: "1990",
  };

  const documentReference = await addDoc(collRef, dataObject);
  alert(`Document was created with ID: ${documentReference.id}`);
};
</script>
