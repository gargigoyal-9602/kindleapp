import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import StorageProvider from "../../../framework/src/StorageProvider.web";

// Customizable Area Start
import { RouteComponentProps } from "react-router";
import { withAlertBoxProps } from "../../../components/src/withAlertBox.Web";
import { withToastProps } from "../../../components/src/withSnackBar.Web";
import { toast } from "react-toastify";
import { withLoaderProps } from "../../../components/src/withLoader.Web";
// Customizable Area End

export const configJSON = require("./config");

export type Props = RouteComponentProps & {
  authToken: any;
  logout: any;
  accountInfo: any;
  mode: boolean;
  // Customizable Area Start
  // Customizable Area End
} & withAlertBoxProps &
  withToastProps &
  withLoaderProps & {
    id: string;
    // Customizable Area Start
    // Customizable Area End
  };

interface S {
  // Customizable Area Start
  studentList: any;
  page: number;
  selectedIndex: any;
  searchInput: any;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class StudentsListController extends BlockComponent<
  Props,
  S,
  SS
> {
  PutchangeStatusCallId: any;
  getStudentsListCallId: any;
  getStudentsSearchCallId: any;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.AlertMessage),
    ];

    this.state = {
      studentList: [],
      page: 0,
      selectedIndex: false,
      searchInput: "",
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (apiRequestCallId === this.getStudentsListCallId) {
        this.props.hideLoader();
        if (responseJson && responseJson.data) {
          this.setState({
            studentList: responseJson.data,
          });
        } else {
          this.sessionLogout();
        }
      } else if (apiRequestCallId === this.PutchangeStatusCallId) {
        // this.props.hideLoader();
        if (responseJson) {
          this.setState({ selectedIndex: null }, () => this.getStudentsList());
          toast.success(responseJson.message);
        } else {
          this.parseApiErrorResponse(responseJson);
          this.setState({ selectedIndex: null });
        }
      } else if (apiRequestCallId === this.getStudentsSearchCallId) {
        this.props.hideLoader();
        if (responseJson.data) {
          this.setState({ studentList: responseJson.data });
        } else {
          toast.error(responseJson.message);
          this.parseApiErrorResponse(responseJson);
          this.setState({ selectedIndex: null });
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start

  sessionLogout = () => {
    this.props
      .showAlert({
        title: "Session Expired",
        message: "Please Login again!",
      })
      .then((data: any) => {
        console.log(data);
        return StorageProvider.remove("adminToken");
      })
      .then(() => StorageProvider.remove("accountInfo"))
      .then(() => {
        const { history } = this.props;

        history.push("/");
      });
  };

  getStudentsList(): any {
    const header = {
      token: this.props.authToken,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getStudentsListCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_admin/students_list"
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    this.props.showLoader();
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  PutchangeStatus(id: any, status: any): any {
    const header = {
      token: this.props.authToken,
      "Content-Type": configJSON.exampleApiContentType,
    };
    const httpBody = {
      data: {
        type: "student",
        attributes: {
          id: this.state.studentList[id].id,
          status: status,
        },
      },
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.PutchangeStatusCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.putChangeStatusAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodTypePut
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }
  getsearchStudentlist = (query: any): any => {
    const header = {
      token: this.props.authToken,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getStudentsSearchCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.searchStudentEndPoint + `${query}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    this.props.showLoader();
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  // Customizable Area End
}
