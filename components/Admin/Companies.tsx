import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ICompany } from "@/schemas/company";
import useSWR from "swr";
import UserTable from "@/components/Admin/UserTable";
import DeleteModalContent from "@/components/Admin/DeleteModalContent";
import UserModalContent from "@/components/Admin/UserModalContent";
import { IUser } from "@/schemas/user";
import { UserInterface } from "@/components/Admin/Brokers";
import CompanyModalContent from "@/components/Admin/CompanyModalContent";
import AddIcon from "@material-ui/icons/Add";

const fetcher = (url) => fetch(url).then((res) => res.json());

export interface CompanyInterface {
  name: string;
  _id?: string;
  bondHolders: IUser;
}

export default function Company(props: { brokers: IUser[] }) {
  const { brokers } = props;

  const { data, error, mutate } = useSWR<ICompany[]>("/api/companies", fetcher);

  const [showingBondholder, setShowingBondholder] = useState<boolean>(false);
  const [showingCompanyModal, setShowingCompanyModal] = useState<boolean>(
    false
  );
  const [deletingCompany, setDeletingCompany] = useState<boolean>(false);
  const [editingCompany, setEditingCompany] = useState<boolean>(false);

  const [company, setCompany] = useState<ICompany | undefined>(undefined);
  const [bondholder, setBondholder] = useState<UserInterface | undefined>(
    undefined
  );
  const [deletingBondholder, setDeletingBondholder] = useState<boolean>(false);
  const [editingBondholder, setEditingBondholder] = useState<boolean>(false);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  function closeBondholder() {
    setShowingBondholder(false);
    setEditingBondholder(false);
    setDeletingBondholder(false);
    setBondholder(undefined);
    mutate();
  }

  function closeCompanyModal() {
    setShowingCompanyModal(false);
    setEditingCompany(false);
    setDeletingCompany(false);
    setCompany(undefined);
    mutate();
  }

  function edit(data) {
    setShowingBondholder(true);
    setEditingBondholder(true);
    const chosenBondholder: UserInterface = {
      name: data.name,
      _id: data._id,
      email: data.email,
      phone: data.phone,
      broker: data.broker,
    };
    setBondholder(chosenBondholder);
  }

  function handleDelete(data) {
    setShowingBondholder(true);
    setDeletingBondholder(true);
    const chosenBondholder: UserInterface = {
      name: data.name,
      _id: data._id,
      email: data.email,
      phone: data.phone,
    };
    setBondholder(chosenBondholder);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2>Companies</h2>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        color="primary"
        onClick={() => {
          setShowingCompanyModal(true);
        }}
        style={{ alignSelf: "flex-end", width: "20%", marginBottom: "14px" }}
      >
        New Company
      </Button>
      <Button
        color="primary"
        startIcon={<AddIcon />}
        variant="contained"
        onClick={() => {
          setShowingBondholder(true);
        }}
      >
        New bondholder
      </Button>
      {data.map((companyElement) => {
        return (
          <div key={companyElement._id} style={{ marginBottom: "2px" }}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{companyElement.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                      <Button
                        onClick={() => {
                          setShowingCompanyModal(true);
                          setCompany(companyElement);
                          setDeletingCompany(true);
                        }}
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={() => {
                          setCompany(companyElement);
                          setEditingCompany(true);
                          setShowingCompanyModal(true);
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                  <UserTable
                    isBondholderTable={true}
                    users={companyElement.bondHolders}
                    handleDelete={handleDelete}
                    edit={edit}
                  />
                </div>
              </AccordionDetails>
            </Accordion>
            <Dialog
              open={showingCompanyModal}
              onClose={() => setShowingCompanyModal(false)}
            >
              {deletingCompany ? (
                <DeleteModalContent
                  title="company"
                  close={closeCompanyModal}
                  company={company}
                />
              ) : (
                <CompanyModalContent
                  title={!editingCompany ? "Add new company" : "Edit company"}
                  setShowing={setShowingCompanyModal}
                  close={closeCompanyModal}
                  company={company}
                />
              )}
            </Dialog>
            <Dialog
              open={showingBondholder}
              onClose={() => setShowingBondholder(false)}
            >
              {deletingBondholder ? (
                <DeleteModalContent
                  title="bondholder"
                  close={closeBondholder}
                  user={bondholder}
                />
              ) : (
                <UserModalContent
                  title={
                    !editingBondholder
                      ? "Add new bondholder"
                      : "Edit bondholder"
                  }
                  isBroker={false}
                  brokers={brokers}
                  user={bondholder}
                  close={closeBondholder}
                  company={company}
                />
              )}
            </Dialog>
          </div>
        );
      })}
    </div>
  );
}
