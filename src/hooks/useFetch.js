import { useState, useEffect } from "react";
const url = "https://randomuser.me/api/";

export const useFetch = () => {
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("random person  ");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("failed to fetch data");
      }
      const data = await response.json();
      const person = data.results[0];
      const { phone, email } = person;
      const { large: image } = person.picture;
      const {
        login: { password },
      } = person;
      const { first, last } = person.name;
      const { age } = person.dob;
      const { number, name } = person.location.street;

      const newPerson = {
        phone,
        email,
        age,
        password,
        image,
        street: `${number} ${name}`,
        name: `${first}${last}`,
      };
      setPerson(newPerson);
      setTitle("name");
      setValue(newPerson.name);
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [setValue, setTitle]);

  return { loading, person, fetchData, title, value, setValue, setTitle };
};
