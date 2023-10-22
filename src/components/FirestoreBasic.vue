<template>
  <div
    class="flex flex-col gap-6 items-center h-screen w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
  >
    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      @click="createUser"
    >
      Create User
    </button>

    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      @click="updateOrCreateCountry"
    >
      Create Country
    </button>

    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      @click="addColumnOrUpdateValueToColumn"
    >
      Add capital column to country
    </button>

    <div>Capital: {{ capital }}</div>
    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      @click="getCountry"
    >
      Get country information
    </button>

    <template v-if="countries" v-for="country in countries" :key="country">
      <div>Country: {{ country.name }}</div>
      <div>Capital: {{ country.capital }}</div>
    </template>

    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      @click="getCountries"
    >
      Get countries
    </button>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { db } from "../main";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";

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
const updateOrCreateCountry = async () => {
  const dataObject = { name: "Cong hoa xa hoi chu nghia Viet Nam" };
  // doc(firestoreInstance, "collectionName", "documentId")
  // setDoc(collectionReference, dataObject)
  try {
    await setDoc(doc(db, "countries", "VN"), dataObject);
    alert(`Set country ${dataObject.name} successfully`);
  } catch (error) {
    alert("Failed to set country");
  }
};

const addColumnOrUpdateValueToColumn = async () => {
  const dataObject = { capital: "Ha Noi" };
  const documentId = "VN";
  try {
    await setDoc(doc(db, "countries", documentId), dataObject, { merge: true });
    alert(
      `Add column capital with value: ${dataObject.capital} to document ${documentId} successfully`,
    );
  } catch (error) {
    alert("Failed to add column");
  }
};

const capital = ref("");
const getCountry = async () => {
  // attempt to retrieve the country
  const documentSnapshot = await getDoc(doc(db, "countries", "VN"));

  // if it exists, alert it
  if (documentSnapshot.exists()) {
    alert(JSON.stringify(documentSnapshot.data()));
    capital.value = documentSnapshot.data().capital;
  } else {
    alert("Document does not exist");
  }
};

const countries = ref([]);
const getCountries = async () => {
  const querySnapshot = await getDocs(query(collection(db, "countries")));

  querySnapshot.forEach((doc) => {
    countries.value.push(doc.data());
  });
};
</script>
