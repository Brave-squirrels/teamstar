const emailContent = (
  url: string,
  btnText: string,
  headerBold: string,
  headerContent?: string,
  blackContent?: string,
  content?: string
) => {
  return `<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
    <tbody>
        <tr>
            <td align="center">
                <table
                    class="col-600"
                    width="600"
                    border="0"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                >
                    <tbody>
                        <tr>
                            <td
                                align="center"
                                valign="top"
                                bgcolor="linear-gradient(266deg, rgba(52,123,150,1) 0%, rgba(6,85,119,1) 100%)"
                                style="background-size: cover; background-position: top"
                            >
                                <table
                                    class="col-600"
                                    width="600"
                                    height="400"
                                    border="0"
                                    align="center"
                                    cellpadding="0"
                                    cellspacing="0"
                                >
                                    <tbody>
                                        <tr>
                                            <td height="40"></td>
                                        </tr>
                                        <tr>
                                            <td align="center" style="line-height: 0px">
                                                <img
                                                    style="
                                                        display: block;
                                                        line-height: 0px;
                                                        font-size: 0px;
                                                        border: 0px;
                                                        height: 100px;
                                                    "
                                                    src="https://i.ibb.co/XYVfX5p/logo.png"
                                                    alt="logo"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                align="center"
                                                style="
                                                    font-family: 'Raleway', sans-serif;
                                                    font-size: 37px;
                                                    color: #ffffff;
                                                    line-height: 24px;
                                                    font-weight: bold;
                                                    letter-spacing: 5px;
                                                "
                                            >
                                                ${headerBold}
                                                <span
                                                    style="
                                                        font-family: 'Raleway', sans-serif;
                                                        font-size: 37px;
                                                        color: #ffffff;
                                                        line-height: 39px;
                                                        font-weight: 300;
                                                        letter-spacing: 5px;
                                                    "
                                                    >${headerContent}</span
                                                >
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                align="center"
                                                style="
                                                    font-family: 'Lato', sans-serif;
                                                    font-size: 15px;
                                                    color: #ffffff;
                                                    line-height: 24px;
                                                    font-weight: 300;
                                                "
                                            >
                                                ${blackContent}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td height="50"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td align="center">
                <table
                    class="col-600"
                    width="600"
                    border="0"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                        margin-left: 20px;
                        margin-right: 20px;
                        border-left: 1px solid #dbd9d9;
                        border-right: 1px solid #dbd9d9;
                    "
                >
                    <tbody>
                        <tr>
                            <td height="35"></td>
                        </tr>
                        <tr>
                            <td
                                align="center"
                                style="
                                    font-family: 'Raleway', sans-serif;
                                    font-size: 22px;
                                    font-weight: bold;
                                    color: #333;
                                "
                            >
                                ${content}
                            </td>
                        </tr>
                        <tr>
                            <td height="10"></td>
                        </tr>
                        <tr>
                            <td
                                align="center"
                                style="
                                    font-family: 'Lato', sans-serif;
                                    font-size: 14px;
                                    color: #757575;
                                    line-height: 24px;
                                    font-weight: 300;
                                    border-bottom: 1px solid grey;
                                    padding-bottom: 1em;
                                "
                            >
                                <a
                                    href="${url}"
                                    onMouseOver="this.style.color='#F3F9F6'"
                                    onMouseOut="this.style.color='#f3f9f6'"
                                    style="
                                        text-decoration: none;
                                        color: #f3f9f6;
                                        font-weight: 600;
                                    "
                                    ><div
                                        style="
                                        background: linear-gradient(266deg, rgba(52,123,150,1) 0%, rgba(6,85,119,1) 100%);

                                            border-radius: 5.11111px;
                                            width: 8rem;
                                            padding: 0.5rem;
                                        "
                                    >
                                        ${btnText}
                                    </div></a
                                >
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>`;
};

export default emailContent;
