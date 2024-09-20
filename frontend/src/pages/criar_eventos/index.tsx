import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect, useState } from "react";

const EventRegistration = () => {
  const { isAuthenticated, getUser, user } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      getUser(); 
    }
  }, [isAuthenticated]);

  const { registerEvent } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    zipcode: "",
    number: "",
    city: "",
    state: "",
    starts_at: "",
    ends_at: "",
    complement: "",
    max_subscription: 0,
    is_active: false,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleZipcodeChange = async (e) => {
    const { value } = e.target;
    setFormData({ ...formData, zipcode: value });

    if (value.length === 8) { 
      try {
        const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
        const data = await response.json();

        if (!data.erro) {
          setFormData((prev) => ({
            ...prev,
            address: data.logradouro,
            city: data.localidade,
            state: data.uf,
          }));
        } else {
          setError("CEP inválido");
        }
      } catch (error) {

        console.error(error); 
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerEvent(formData);
      alert("Evento cadastrado com sucesso!");
      setFormData({
        name: "",
        description: "",
        address: "",
        zipcode: "",
        number: "",
        city: "",
        state: "",
        complement: "",
        starts_at: "",
        ends_at: "",
        max_subscription: 0,
        is_active: false,
      });
    } catch (error) {
      console.error("Erro ao cadastrar evento:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Description</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div>
          <label>Complement</label>
          <input type="text" name="complement" value={formData.complement} onChange={handleChange} required />
        </div>
        <div>
          <label>Zipcode</label>
          <input type="text" name="zipcode" value={formData.zipcode} onChange={handleZipcodeChange} required />
        </div>
        <div>
          <label>Number</label>
          <input type="text" name="number" value={formData.number} onChange={handleChange} required />
        </div>
        <div>
          <label>City</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} required />
        </div>
        <div>
          <label>State</label>
          <input type="text" name="state" value={formData.state} onChange={handleChange} required />
        </div>
        <div>
          <label>Starts At</label>
          <input type="datetime-local" name="starts_at" value={formData.starts_at} onChange={handleChange} required />
        </div>
        <div>
          <label>Ends At</label>
          <input type="datetime-local" name="ends_at" value={formData.ends_at} onChange={handleChange} required />
        </div>
        <div>
          <label>Max Subscription</label>
          <input type="number" name="max_subscription" value={formData.max_subscription} onChange={handleChange} required />
        </div>
        <div>
          <label>Active</label>
          <input type="checkbox" name="is_active" checked={formData.is_active} onChange={() => setFormData(prev => ({ ...prev, is_active: !prev.is_active }))} />
        </div>
      </div>
      {error && <p>{error}</p>}
      <button type="submit">Register Event</button>
    </form>
  );
};

export default EventRegistration;
