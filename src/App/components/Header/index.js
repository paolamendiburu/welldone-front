import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import {userReset, userSaveData} from "../../../actions";
import {withRouter} from 'react-router-dom';


class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout=()=>{
      this.props.userReset();
      this.props.history.push('/login');
  };

  render() {
      const { i18n } = this.props;
      const changeLanguage = lng => {
          i18n.changeLanguage(lng);
      };
      return (
          <Navbar color="inverse" light expand="md" className="main-header">
              <NavbarBrand href="/">
                  <img src="/images/logo-h.svg" alt="Welldone" title="Welldone" />
              </NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                  {this.props.data[0].isLogged === false ? (
                      <Nav className="ml-auto" navbar>
                          <NavItem>
                              <NavLink to="/login">Inicia sesión</NavLink>
                              <NavLink to="/register" className="main-header__button">
                                  Crea una cuenta {i18n.locale }
                                  </NavLink>
                          </NavItem>
                      </Nav>
                  ) : (
                      <Nav className="ml-auto" navbar>
                          <NavItem>
                              <NavLink to="/admin/new-article" className="main-header__button">Escribe un artículo</NavLink>
                          </NavItem>
                          <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>
                                  {this.props.data[0].username}
                              </DropdownToggle>
                              <DropdownMenu right>
                                  <DropdownItem><Link to="/admin/MyArticles">Mis artículos</Link></DropdownItem>
                                  <DropdownItem><Link to="/admin/MyFavorites">Favoritos</Link></DropdownItem>
                                  <DropdownItem><Link to="/admin/highlights">Subrayados</Link></DropdownItem>
                                  <DropdownItem><Link to="/admin/notifications">Notificaciones</Link></DropdownItem>
                                  <DropdownItem><Link to="/admin/account">Cuenta</Link></DropdownItem>
                                  <DropdownItem divider />
                                  <DropdownItem  onClick={this.logout}>Cerrar sesión</DropdownItem>
                              </DropdownMenu>
                          </UncontrolledDropdown>
                      </Nav>
                  )}
                  {i18n.language === undefined || i18n.language === 'es' ? (
                      <button onClick={() => changeLanguage('en')} className="main-header__language">en</button>
                  ) : (
                      <button onClick={() => changeLanguage('es')} className="main-header__language">es</button>
                  )}
                  </Collapse>
          </Navbar>
      );
  }
}

const mapStateToProps = state => ({
  data: state.user.data
});

const mapDispatchToProps = {
    userReset,
    userSaveData
};

export default withRouter (translate('translations')(connect(mapStateToProps, mapDispatchToProps)(Header)));
