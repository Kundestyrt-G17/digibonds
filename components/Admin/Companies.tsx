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
import Loading from "@/components/Loading";

const fetcher = (url) => fetch(url).then((res) => res.json());

export interface CompanyInterface {
  name: string;
  _id?: string;
  bondHolders: IUser;
}

export default function Company(props: { brokers: IUser[] }) {
  const { brokers } = props;

  const { data: companies, error, mutate } = useSWR<ICompany[]>(
    "/api/companies",
    fetcher
  );

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
  if (!companies) return <Loading />;

  const data = companies.sort((companyA, companyB) =>
    companyA.name.localeCompare(companyB.name)
  );

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

  function edit(data, company) {
    setShowingBondholder(true);
    setEditingBondholder(true);
    setCompany(company);
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
      <h2>Bondholders</h2>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        color="primary"
        onClick={() => {
          setCompany(undefined);
          setShowingCompanyModal(true);
        }}
        style={{ alignSelf: "flex-end", width: "25%", marginBottom: "15px" }}
      >
        New bondholder
      </Button>

      {data.map((companyElement) => {
        return (
          <div key={companyElement._id} style={{ marginBottom: "15px" }}>
            <Accordion style={{ backgroundColor: "#f6f6f6" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{companyElement.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                      <Button
                        color="secondary"
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
                    <Button
                      color="primary"
                      style={{
                        width: "25%",
                        alignSelf: "flex-end",
                        marginBottom: "8px",
                      }}
                      startIcon={<AddIcon />}
                      variant="contained"
                      onClick={() => {
                        setCompany(companyElement);
                        setShowingBondholder(true);
                      }}
                    >
                      New Contact Person
                    </Button>
                  </div>
                  <UserTable
                    isBondholderTable={true}
                    users={companyElement.bondHolders}
                    handleDeleteBondholder={handleDelete}
                    editBondholder={edit}
                    company={companyElement}
                  />
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        );
      })}
      <Dialog open={showingCompanyModal} onClose={() => closeCompanyModal()}>
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
      <Dialog open={showingBondholder} onClose={() => closeBondholder()}>
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
                ? `Add new contact person to ${company?.name}`
                : `Edit contact person in ${company?.name}`
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
}
