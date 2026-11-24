import { useEffect, useState } from "react";
import {
  subscribeToVendors,
  subscribeToVendor,
  subscribeToMenu,
} from "../services/vendors.js";

export function useVendor(vendorId) {
  const [vendors, setVendors] = useState([]);
  const [vendor, setVendor] = useState(undefined); // undefined = loading, null = not found
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!vendorId) {
      return subscribeToVendors(
        (data) => {
          setVendors(data);
          setLoading(false);
        },
        (err) => {
          setError(err.message);
          setLoading(false);
        },
      );
    }

    const stopVendor = subscribeToVendor(
      vendorId,
      (data) => {
        setVendor(data);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );
    const stopMenu = subscribeToMenu(vendorId, setMenu, (err) => {
      setError(err.message);
      setLoading(false);
    });

    return () => {
      stopVendor();
      stopMenu();
    };
  }, [vendorId, reloadKey]);

  function reload() {
    setReloadKey((key) => key + 1);
  }

  return { vendors, vendor, menu, loading, error, reload };
}
