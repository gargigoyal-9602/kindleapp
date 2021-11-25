import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";


// Customizable Area Start
import StorageProvider from "../../../framework/src/StorageProvider.web";
import { RouteProps, RouteComponentProps } from "react-router-dom";
import { withAlertBoxProps } from "../../../components/src/withAlertBox.Web";
import { withToastProps } from "../../../components/src/withSnackBar.Web";
import { withLoaderProps } from "../../../components/src/withLoader.Web";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Customizable Area End

export const configJSON = require("./config");

// export interface Props {
//   navigation: any;
//   id: string;
//   classes: any;
//   mode: any;
//   setTheme: any;
//   cartDetails: any;
//   stripe: any;
//   elements: any;
// }
export type Props = {
  authToken: any;
  classes: any;
  mode: any;
  setTheme: any;
  cartDetails: any;
  stripe: any;
  elements: any;
  navigation: any;
  id: string;
  
} & RouteProps &
  RouteComponentProps &
  withAlertBoxProps &
  withToastProps &
  withLoaderProps & {
    id: string;
  };

export interface S {
  authToken: any;
  Loader: any;
  searchInput: any;
  accountInfo: any;
  reviewOrder: any;
  cardDetailsSubmitted: any;
  orderId: any;
  cartInfo: any;
  bookCart:any;
      notesCart:any;
  // stripe: any;
  // elements: any;
}

interface SS {
  id: any;
}

export default class BuyBookController extends BlockComponent<Props, S, SS> {
  getStudentsListCallId: any;
  postSearchBookApiCallId: string = "";
  postcreateorderApiCallId: string = "";
  getCartApiCallId: string = "";
  delCartItemApiCallId: string = "";
  postPaymentIntentApiCallId: string = "";
  postBuyPackageApiCallId  :  string="";

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];

    this.state = {
      authToken: "",
      Loader: false,
      searchInput: "",
      accountInfo: "",
      reviewOrder: false,
      cardDetailsSubmitted: false,
      orderId: "",
      cartInfo: "",
      bookCart:"",
      notesCart:""
      // stripe: "",
      // elements: "",
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  componentDidMount = async () => {
    const accountInfo = await StorageProvider.get("accountInfo");
    const authToken = await StorageProvider.get("authToken");
    const bookId = await StorageProvider.get("bookId");
    const cartId = await StorageProvider.get("orderId");

    if (authToken) {
      this.setState({
        accountInfo: JSON.parse(accountInfo),
        authToken: authToken,
        orderId:cartId
      });

      // this.postcreateorder(bookId);
      cartId && this.getCart(cartId);
    } else {
      const { history }: any = this.props;
      history.push("/");
    }
  };

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson && !responseJson.errors){
        const apiRequestCallId = message.getData(
          getName(MessageEnum.RestAPIResponceDataMessage)
        );
        if (apiRequestCallId != null) {
          //create order
          if (apiRequestCallId === this.postcreateorderApiCallId) {
            console.log("create order ", responseJson.data.order.data);
            this.setState({
              Loader: false,
            });
          }

          //get cart
          if (apiRequestCallId === this.getCartApiCallId) {
            console.log("get cart ", responseJson.data.order.data);
            
            const bookCart = responseJson.data.order.data.attributes.order_items.filter((item:any)=>{
             return item.attributes.book !=null
            })
             const notesCart = responseJson.data.order.data.attributes.order_items.filter((item:any)=>{
            return item.attributes.note !=null
            })
            console.log(responseJson.data.order.data,"cartinfo")
            this.setState({
              cartInfo: responseJson.data.order.data,
              bookCart: bookCart,
              notesCart: notesCart,
              Loader: false,
            })
            



          }

          //del cart item
          if (apiRequestCallId === this.delCartItemApiCallId) {
            // console.log("del cart ", responseJson);
            this.gettingOrderID();           
            toast.success(responseJson.message);
            this.state.cartInfo.attributes.order_items.length ==1 && 
            //@ts-ignore
            this.props.history.push('/cart')
            this.setState({
              Loader: false,
            
            });
          }

          //post payment intent
          if (apiRequestCallId === this.postPaymentIntentApiCallId) {
            console.log("payment successful", responseJson);
            if(responseJson?.data){
            toast.success(responseJson?.data?.message);
            this.removingOrderId()
            //@ts-ignore
            this.props.history.push("/order-placed/book");
            }
            this.setState({
              Loader: false,
            });
            
          }
           
          //post buy packages 
          if (apiRequestCallId === this.postBuyPackageApiCallId) {
            console.log("payment successful packages", responseJson);
            if(responseJson?.data){
            toast.success(responseJson?.data?.message);
            this.removingOrderId()
            //@ts-ignore
            this.props.history.push("/order-placed/package");
            }
            this.setState({
              Loader: false,
            });
            
          }

        }
      }
      if(responseJson?.errors){
       
        responseJson?.errors[0].token == "Token has Expired" &&  StorageProvider.remove("authToken");
        // this.sessionLogout();
      }
    }
    // Customizable Area End
  }
  // for session expire
  sessionLogout = async () => {
    const accountInfo = await StorageProvider.get("accountInfo");

    this.props
      .showAlert({
        title: "Session Expired",
        message: "Please Login again!",
      })
      .then((data: any) => {
        //console.log(data);
        StorageProvider.remove("authToken");
        StorageProvider.remove("orderId");
        StorageProvider.remove("accountInfo");
        
      })
      .then(() => {
        
        StorageProvider.remove("orderId");

      })
      .then(() => {
        const { history } = this.props;

        history.push("/");
      });
  };

  postcreateorder = (id: any): boolean => {
    this.setState({
      Loader: true,
    });
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.authToken,
    };

    const httpBody = {
      book_id: id,
      quantity: "1",
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postcreateorderApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.postCreateOrderAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  // get all books
  getCart = (id: any): boolean => {
    this.setState({
      Loader: true,
    });
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.authToken,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getCartApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.postCreateOrderAPiEndPoint + `/${id}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  // delCartItem
  delCartItem = (id: any): boolean => {
    this.setState({
      Loader: true,
    });
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.authToken,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.delCartItemApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.delCartItemAPiEndPoint + `/${id}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.deleteApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  /// post payment intent
  postPaymentIntent = (id: any) => {
    this.setState({
      Loader: true,
    });
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.authToken,
    };

    
    const httpBody = {
      data: {
        attributes: {
          order_id: this.state.orderId,
          currency: "inr",
        },
        payment_token: id,
      },
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postPaymentIntentApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.postPaymentIntentAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };


  ///buy packages
  postBuyPackage = (id: any) => {
    this.setState({
      Loader: true,
    });
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.authToken,
    };

    const isMonthly = window.location.pathname.split("/")
    
    const httpBody = {
      data : {
        attributes : {
            package_id : isMonthly[2],
            currency: "inr",
            is_monthly: isMonthly[3]=="monthly" ? true : false
        },
        payment_token : id
    }
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postBuyPackageApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.postBuyPackagesApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };
  

  gettingOrderID = async () => {
    const order_id = await StorageProvider.get("orderId");
    this.getCart(order_id);

  };

removingOrderId = async () => {
  await StorageProvider.remove("orderId");
}

 }
