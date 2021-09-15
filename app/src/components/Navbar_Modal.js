import React from "react";
import { connect } from "react-redux";
import { normalizeGroups } from "../utils/normalization";

const styles = {};

const NavbarModal = ({ isOpen, close }) =>
  <div
    className={
      isOpen ? "modal fade overflow-auto show" : "modal fade overflow-auto"
    }
    style={{ display: "block", zIndex: isOpen ? 1 : -1 }}
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Sélectionner un groupe
          </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={close}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body d-flex flex-column">
          <div>
            <a href="#">test</a>
            <div className="ml-3 border-left">
              ˫ <a href="#">test</a>
              <br />˫{" "}
              <a href="#" className="text-secondary">
                Ile de France
              </a>
              <div className="ml-3 border-left">
                ˫ <a href="#">test</a>
                <br />˫ <a href="#">test</a>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={close}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  </div>;

const mapStateToProps = state => ({
  isOpen: state.navbar.modal.open,
  groupTree: normalizeGroups(state.groups)
});

const mapDispatchToProps = dispatch => ({
  close: () => dispatch({ type: "NAVBAR_TOGGLE_MODAL" })
});

export default connect(mapStateToProps, mapDispatchToProps)(NavbarModal);
