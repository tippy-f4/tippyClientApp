// @flow

import * as React from "react";
import { type Dispatch } from "redux";
import styled from "styled-components";
import { connect } from "react-redux";
import { actions } from "../redux/modules/employee";
import { actions as listActions } from "../redux/modules/list";
import Item from "../components/EmployeeItem";
import ItemHeader from "../components/EmployeeHeader";
import SideBar from "../components/SideBar";
import COLOR from "../constatns/color";
import Button from "../components/Button";
import Bell from "../assets/Bell.png";
import QRShow from "../components/QRShow";
import Modal from "../components/ModalWrapper";
import { Pulse } from "styled-spinkit";

class List extends React.Component {
  componentDidMount() {
    const { startFetchData } = this.props;
    startFetchData();
  }

  render() {
    const {
      isLoading,
      data,
      selectedRoute,
      openModal,
      closeModal,
      selectedModalName,
      selectedItem
    } = this.props;
    return (
      <React.Fragment>
        <Container>
          <TitleRow>
            <Title>{selectedRoute}</Title>
            <SideMenu>
              <Button>+ 社員を追加する</Button>
              <NotifyBox>
                <SImg src={Bell} />
                <NoticeText>通知</NoticeText>
              </NotifyBox>
            </SideMenu>
          </TitleRow>

          {isLoading || !data ? (
            <p>
              <Pulse />
            </p>
          ) : (
            <React.Fragment>
              <ItemHeader />
              <Row>
                {data.map(d => (
                  <SItem item={d} onClick={() => openModal(d)} />
                ))}
              </Row>
            </React.Fragment>
          )}
        </Container>
        {selectedModalName && (
          <Modal onClose={closeModal}>
            <QRShow item={selectedItem} />
          </Modal>
        )}
      </React.Fragment>
    );
  }
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
`;

const Container = styled.div`
  padding: 48px;
  width: calc(100% - 244px);
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SItem = styled(Item)`
  margin-top: 16px;
  box-shadow: 0 2px 5px 0 rgba(159, 159, 159, 0.5);
`;

const TitleRow = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 82px;
  align-items: center;
`;

const Title = styled.h2`
  color: ${COLOR.warmBlack};
  font-family: HiraginoSans-W6;
  font-size: 20px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  width: 200px;
`;

const NotifyBox = styled.div`
  width: 100px;
  height: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 40px;
`;

const SideMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: calc(100% - 200px);
`;

const SImg = styled.img`
  height: 15px;
  width: 15px;
`;

const NoticeText = styled.p`
  width: 28px;
  height: 14px;
  font-family: HiraginoSans-W3;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  color: ${COLOR.warmBlack};
  margin-left: 8px;
  justify-content: flex-end;
`;

const mapStateToProps = state => ({
  isLoading: state.employee.isLoading,
  isLoaded: state.employee.isLoaded,
  data: state.employee.data,
  error: state.employee.error,
  selectedRoute: state.sideBar.selectedRoute,
  selectedItem: state.list.selectedItem,
  selectedModalName: state.list.selectedModalName
});

const mapDispatchToProps = dispatch => ({
  startFetchData: () => dispatch(actions.startFetchData()),
  openModal: name => dispatch(listActions.openModal(name)),
  closeModal: () => dispatch(listActions.closeModal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
