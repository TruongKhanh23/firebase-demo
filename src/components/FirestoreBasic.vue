<template>
  <div
    class="flex flex-col gap-6 items-center w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
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

    <div>Name: {{ country.name }}</div>
    <div>Capital: {{ country.capital }}</div>
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

    <div class="font-bold">Users by condition</div>
    <template v-if="users" v-for="(user, index) in users" :key="user">
      <div>User {{ index }}: {{ user.firstName }} {{ user.lastName }}</div>
    </template>
    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      @click="getUsersByCondition"
    >
      Get users by condition
    </button>

    <div class="font-bold">Users with order</div>
    <template v-if="usersOrder" v-for="(user, index) in usersOrder" :key="user">
      <div>{{ user.firstName }} {{ user.lastName }}</div>
    </template>
    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      @click="getUsersOrder"
    >
      Get users with order
    </button>

    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      @click="deleteCountry"
    >
      Delete country
    </button>

    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      @click="deleteFieldCapital"
    >
      Delete Field
    </button>

    <p class="font-bold">Realtime Country</p>
    <div>Name: {{ realtimeCountry.name }} (aka. {{ realtimeCountry.aka }})</div>
    <div>Capital: {{ realtimeCountry.capital }}</div>
    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      @click="addAlsoKnownAs"
    >
      Add AKA
    </button>

    <div class="font-bold">Users realtime</div>
    <template v-if="realTimeUsers" v-for="(user, index) in realTimeUsers" :key="user">
      <div>{{ user.firstName }} {{ user.lastName }}</div>
    </template>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { db } from "../main";
import {
  where,
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  orderBy,
  limit,
  updateDoc,
  deleteDoc,
  deleteField,
  onSnapshot,
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
  const dataObject = { capital: "New York" };
  const documentId = "US";
  try {
    await setDoc(doc(db, "countries", documentId), dataObject, { merge: true });
    alert(
      `Add column capital with value: ${dataObject.capital} to document ${documentId} successfully`,
    );
  } catch (error) {
    alert("Failed to add column");
  }
};

const country = ref("");
const getCountry = async () => {
  // attempt to retrieve the country
  const documentSnapshot = await getDoc(doc(db, "countries", "US"));

  // if it exists, alert it
  if (documentSnapshot.exists()) {
    alert(JSON.stringify(documentSnapshot.data()));
    country.value = documentSnapshot.data();
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

const users = ref([]);
const getUsersByCondition = async () => {
  const querySnapshot = await getDocs(
    query(collection(db, "users"), where("dob", ">", "1990")),
  );
  querySnapshot.forEach((doc) => {
    users.value.push(doc.data());
  });
};

const usersOrder = ref([]);
const getUsersOrder = async () => {
  const querySnapshot = await getDocs(
    query(collection(db, "users"), orderBy("firstName"), limit(1)),
  );
  querySnapshot.forEach((doc) => {
    usersOrder.value.push(doc.data());
  });
};

const deleteCountry = async () => {
  const countryId = "VN";
  try {
    await deleteDoc(doc(db, "countries", countryId));
    alert(`Country ${countryId} was deleted`);
  } catch (error) {
    alert(`Delete country failed`);
  }
};

const deleteFieldCapital = async () => {
  try {
    await updateDoc(doc(db, "countries", "US"), {
      capital: deleteField(),
    });
    alert(`Field captial was deleted`);
  } catch (error) {
    alert(`Delete Field failed: ${error}`);
  }
};

const realtimeCountry = ref({});
onMounted(async () => {
  await getRealtimeCountry();
  await getUsersRealtime()
});
// await getRealtimeCountry()

const getRealtimeCountry = async () => {
  onSnapshot(doc(db, "countries", "US"), (snap) => {
    const snapShot = snap.data();
    realtimeCountry.value.name = snapShot.name;
    realtimeCountry.value.capital = snapShot.capital;
    realtimeCountry.value.aka = snapShot.aka;
  });
};

const addAlsoKnownAs = async () => {
  try {
    await setDoc(
      doc(db, "countries", "US"),
      {
        capital: "New York",
      },
      { merge: true },
    );
    alert("Add capital successfully");
  } catch (error) {
    alert("Add capital failed");
  }
};

const realTimeUsers = ref([])
const getUsersRealtime = async () => {
  try {
    onSnapshot(query(collection(db, "users"), where("dob", "<", "1990")), (snap) => {
      snap.forEach((doc) => {
        realTimeUsers.value.push(doc.data())
      })
    })
  } catch (error) {
    alert("Get users realtime failed")    
  }
}
</script>
