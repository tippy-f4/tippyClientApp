// @flow

import * as React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import COLOR from "../constatns/color";
import Button from "../components/Button";
import Bell from "../assets/Bell.png";

const Policy = (props: Props) => {
  const { className, children, selectedRoute } = props;
  return (
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
      <Wrapper className={className}>工事中</Wrapper>
    </Container>
  );
};

const Container = styled.div`
  padding: 48px;
  width: calc(100% - 244px);
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotifyBox = styled.div`
  width: 100px;
  height: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 40px;
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

const TitleRow = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 82px;
  align-items: center;
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
  selectedRoute: state.sideBar.selectedRoute
});

export default connect(
  mapStateToProps,
  null
)(Policy);
