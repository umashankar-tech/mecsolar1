import React, { useContext, useState, useEffect } from "react";
import { db } from "src/firebase"

const EntityContext = React.createContext()

export function useEntity() {
  return useContext(EntityContext)
}

export function EntityProvider({ children }) {
    const entitRef = db.collection("Entity");

    function fetchEntitys() {
        return entitRef.get();
    }

    const value = {
        name: "",
        fetchEntitys,
    }

  return (
    <EntityContext.Provider value={value}>
      {children}
    </EntityContext.Provider>
  )
}
