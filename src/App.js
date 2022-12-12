import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddBook from "./Components/AddData/AddBook";
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminPage from "./Components/Admin/AdminPage";
import AdminPrivateRoute from "./Components/AdminPrivateRoute/AdminPrivateRoute";
import BookDisplay from "./Components/Display/BookDisplay";
import ViewPdf from "./Components/Display/ViewPdf";
import BannerEditDisplaybook from "./Components/EditData/BannerEditDisplaybook";
import BooklistEdit from "./Components/EditData/BookListEdit";
import FrontPageEdit from "./Components/EditData/FrontPageEdit";
import TermsConditionEdit from "./Components/EditData/TermsConditionEdit";
import Home from "./Components/Home/Home";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import TermsCondition from "./Components/TermsCondition/TermsCondition";
import NotFound from "./Components/NotFound/NotFound";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/home">
          <Home />
        </Route>

        <PrivateRoute path="/termsCondition">
          <TermsCondition />
        </PrivateRoute>

        <AdminPrivateRoute path="/addBook">
          <AddBook />
        </AdminPrivateRoute>

        <AdminPrivateRoute path="/termsConditionEdit">
          <TermsConditionEdit />
        </AdminPrivateRoute>

        <Route path="/adminLogin">
          <AdminLogin />
        </Route>

        <AdminPrivateRoute path="/dashboard">
          <AdminPage />
        </AdminPrivateRoute>

        <AdminPrivateRoute path="/bookListEdit">
          <BooklistEdit />
        </AdminPrivateRoute>

        <AdminPrivateRoute path="/frontPageEdit">
          <FrontPageEdit />
        </AdminPrivateRoute>

        <AdminPrivateRoute path="/bannerEditDisplaybook">
          <BannerEditDisplaybook />
        </AdminPrivateRoute>

        <PrivateRoute path="/books">
          <BookDisplay />
        </PrivateRoute>

        <PrivateRoute path="/viewPdf/:bookId">
          <ViewPdf />
        </PrivateRoute>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
