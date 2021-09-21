import React from "react";
import { connect } from "react-redux";
import { normalizeGroups } from "../utils/normalization";

const styles = {};

const recDisplayGroups = (node, onClick, idx) =>
  <div key={node.level + "grp" + idx} className="ml-3 border-left">
    ˫{" "}
    <a
      className={node.selected ? "text-secondary" : undefined}
      onClick={e => onClick(e, node.id, node.accessible)}
      href={node.accessible ? "#" : undefined}
    >
      {node.title}
    </a>
    <br />
    {node.children &&
      node.children.map((elem, idx2) => recDisplayGroups(elem, onClick, idx2))}
  </div>;

const NavbarModal = ({ isOpen, close, groupTree, onClick }) =>
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
            {groupTree.map((elem, idx) => recDisplayGroups(elem, onClick, idx))}
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
  groupTree: normalizeGroups(
    state.groups,
    state.user.operatingGroups,
    state.user.militantGroups,
    state.selectedGroup,
    state.user.admin
  )
});

const mapDispatchToProps = dispatch => ({
  close: () => dispatch({ type: "NAVBAR_TOGGLE_MODAL" }),
  onClick: (e, group, accessible) => {
    e.preventDefault();
    if (accessible) {
      dispatch({ type: "NAVBAR_GROUP_CLICKED", group });
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NavbarModal);
