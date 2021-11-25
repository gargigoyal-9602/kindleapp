import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { RouteComponentProps } from "react-router";
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { withAlertBoxProps } from "../../../components/src/withAlertBox.Web";
import { withToastProps } from "../../../components/src/withSnackBar.Web";
import { withLoaderProps } from "../../../components/src/withLoader.Web";
// Customizable Area End

export const configJSON = require("./config");

export type Props = RouteComponentProps & {
  authToken: any;
  logout: any;
  accountInfo: any;
  classes:any;
  mode: any;
  // Customizable Area Start
  // Customizable Area End
} & withAlertBoxProps &
  withToastProps &
  withLoaderProps & {
    id: string;
    // Customizable Area Start
    // Customizable Area End
  };

export interface S {
  // Customizable Area Start
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  open: boolean;
  publisherName: string;
  publishersList: any;
  playBackSpeed: any;
  is_playing:any;
  bookDetail:any;
  uploadData:any;
  audioUrl:any;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class UploadMediaController extends BlockComponent<
  Props,
  S,
  SS
> {
  createPublisherCallId: any;
  getPublishersListCallId: any;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      open: false,
      publisherName: "",
      publishersList: [],
      playBackSpeed: "1",
      is_playing:false,
      bookDetail:"",
      uploadData:"",
      audioUrl:"",
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
      if (apiRequestCallId === this.createPublisherCallId) {
        this.props.hideLoader();
        if (responseJson && responseJson.data) {
          this.props.showToast({
            message: "successfully create publisher",
            type: "success",
          });
          setTimeout(() => {
            this.props.history.goBack();
          }, 2000);
        } else {
          this.props.showToast({
            message: responseJson.errors[0].account,
            type: "error",
          });
          this.parseApiErrorResponse(responseJson);
        }
      } else if (apiRequestCallId === this.getPublishersListCallId) {
        this.props.hideLoader();
        if (responseJson && responseJson.data) {
          console.log(responseJson.data,"list")
          this.setState({
            publishersList: responseJson.data,
          });
        } else {
          this.parseApiErrorResponse(responseJson);
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  addPublisher = (e: any) => {
    e.preventDefault();
    let httpBody = {
      data: {
        type: "email_account",
        attributes: {
          full_name: this.state.publisherName,
          activated: true,
        },
      },
    };
    const header = {
      token: this.props.authToken,
      "Content-Type": "application/json",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.createPublisherCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "account_block/accounts"
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
      "POST"
    );
    this.props.showLoader();
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  getPublishersList(): any {
    this.props.showLoader();
    const header = {
      token: this.props.authToken,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getPublishersListCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_admin/publishers_list"
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }
  toBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
 

  handleBookSave = async (values: any) => {
    
    const coverImageFile: any = values.thumbnail[0];
    const audioFile: any =values.bookMp3[0]  
    const bookFile: any = values.bookPdf[0];
    console.log(coverImageFile, audioFile, bookFile);
    if (!coverImageFile || !audioFile || !bookFile) {
      return this.props.showToast({
        message: "something went Wrong!",
        type: "error",
      });
    }
    
    let httpBody = {
      book: {
        // cover_image_data: await this.toBase64(coverImageFile),
        // cover_image_content_type: coverImageFile.type,
        // cover_image_filename: coverImageFile.name,
        // book_pdf_data: await this.toBase64(bookFile),
        // book_pdf_content_type: bookFile.type,
        // book_pdf_filename: bookFile.name,
        // sample_audio_data: await this.toBase64(audioFile),
        // sample_audio_content_type: audioFile.type,
        // sample_audio_filename: audioFile.name,
        // name: values.price,
        // language: values.language,
        // summary: values.bookDesc,
        // publisher_id: values.publisherName,
        // price: values.price,
        // author: values.autherName,
        // book_type: "epub",
        // discount_price: values.discount,
        // length: 150,
        sample_audio_content_type: "mp3",
        sample_audio_filename: "audio",
        cover_image_url:await this.toBase64(values.thumbnail[0]),
        book_pdf_url: values.bookPdf[0],
        book_audio_url: await this.toBase64(values.bookMp3[0]),
        sample_audio_url : await this.toBase64(values.bookSampleMp3[0]),
        preview_pdf_url: values.bookSamplePdf[0],
        name: values?.bookPdf[0].name.split('.epub')[0],
        language: values.language,
        summary: values.bookDesc,
        publisher_id: values.publisherId,
        publisher_name: values.publisherName,
        author: values.autherName,
        book_type: "ebook",
        length_in_string: values.length,
        one_time_price: values.oneTimePrice,
        monthly_price: values.monthlyPrice,
        publisher_commission: values.discount,
        package_one_time_price: values.packageOneTimePrice,
        package_monthly_price: values.packageMonthlyPrice,
        package_publisher_commission: values.packageDiscount,
        isbn:values.isbn
      },
    };

    const header = {
      token: this.props.authToken,
      "Content-Type": "application/json",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.createPublisherCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_book/books"
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
      "POST"
    );
    this.props.showLoader();
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  // Customizable Area End
}
